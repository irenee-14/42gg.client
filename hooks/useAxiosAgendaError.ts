import { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { instanceInAgenda } from 'utils/axios';
import { agendaErrorState } from 'utils/recoil/agendaError';
import { loginState } from 'utils/recoil/login';

export default function useAxiosAgendaError() {
  const setLogin = useSetRecoilState(loginState);
  const [isRecalling, setIsRecalling] = useState(false);
  const setError = useSetRecoilState(agendaErrorState);
  const refreshToken = Cookies.get('refresh_token') || '';

  const accessTokenHandler = async () => {
    console.log('accessTokenHandler');
    try {
      const res = await instanceInAgenda.post(
        `/pingpong/users/accesstoken?refreshToken=${refreshToken}`
      );
      localStorage.setItem('42gg-token', res.data.accessToken);
    } catch (error) {
      setError({ msg: '로그인이 만료되었습니다', status: 401 });
    }
  };

  const errorResponseHandler = async (error: AxiosError) => {
    console.log('errorResponseHandler', error);
    const defaultReturn = () => {
      if (isRecalling === true) {
        setLogin(false);
        setIsRecalling(false);
      }
      return Promise.reject(error);
    };
    if (error.response === undefined || error.response?.status === undefined) {
      return defaultReturn();
    }
    switch (error.response.status) {
      case 401: {
        if (!isRecalling) {
          setIsRecalling(true);
          try {
            const res = await instanceInAgenda.post(
              `/pingpong/users/accesstoken?refreshToken=${refreshToken}`
            );
            localStorage.setItem('42gg-token', res.data.accessToken);
            setIsRecalling(false);
            return instanceInAgenda.request(error.config);
          } catch (error) {
            setIsRecalling(false);
            setError({ msg: '로그인이 만료되었습니다', status: 401 });
            return Promise.reject(error);
          }
        } else return defaultReturn();
      }
      case 400:
        if (error.config.method === 'get') {
          setError({
            msg: '데이터를 가져올 수 없습니다.',
            status: error.response.status,
          });
        }
        break;
      case 404:
        setError({
          msg: '문제가 발생했습니다.',
          status: error.response.status,
        });
        break;
      case 500:
        setError({
          msg: '서버 오류가 발생했습니다',
          status: error.response.status,
        });
        break;
    }
    return defaultReturn();
  };

  const responseInterceptor = instanceInAgenda.interceptors.response.use(
    (response: AxiosResponse) => response,
    errorResponseHandler
  );
  useEffect(() => {
    if (localStorage.getItem('42gg-token')) {
      setLogin(true);
    } else {
      accessTokenHandler();
      setLogin(true);
    }
  }, []);

  useEffect(() => {
    return () => {
      instanceInAgenda.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor]);
}
