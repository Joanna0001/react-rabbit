import { useState } from 'react';
import { Flex, Form, Input, Checkbox, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/images/logo.png';
import bg from '@/assets/images/login-bg.png';
import style from './index.module.css';
import type { LoginForm } from '@/types/user';
import { login } from '@/api/user';
import { useUserStore } from '@/store/userStore';
import { FooterInfo } from '@/layouts/components/Footer';

export default function Login() {
  const navigate = useNavigate();
  const { setToken, setUserInfo } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: LoginForm) => {
    setLoading(true);

    // 调用登录接口
    const res = await login({
      account: values.account,
      password: values.password,
    }).finally(() => setLoading(false));

    const { token, ...other } = res;
    // 保存token
    setToken(token);
    // 保存用户信息
    setUserInfo(other);
    // 显示成功消息
    message.success('登录成功！');
    // 跳转到首页
    navigate('/');
  };

  return (
    <div style={{ background: '#fff', height: '100%' }}>
      <Flex
        justify="space-between"
        align="flex-end"
        style={{ margin: '0 auto', background: '#fff', maxWidth: 'var(--max-width)' }}
      >
        <div className={style.logo} style={{ background: `url(${logo}) no-repeat center 18px / contain` }}></div>
        <div className={style.desc} onClick={() => navigate('/')}>
          <span>进入网站首页</span>
          <i className={`iconfont icon-angle-right ${style.arrowIcon}`}></i>
          <i className={`iconfont icon-angle-right ${style.arrowIcon}`}></i>
        </div>
      </Flex>

      <div className={style.bg} style={{ background: `url(${bg}) no-repeat center / cover` }}>
        <div className={style.formContainer}>
          <div className={style.formHeader}>账户登录</div>
          <Form
            className={style.form}
            initialValues={{ account: 'heima282', password: 'hm#qd@23!', agree: true }}
            onFinish={onFinish}
            colon={false}
            autoComplete="off"
          >
            <Form.Item label="账户" name="account" rules={[{ required: true }]}>
              <Input allowClear />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码长度不能少于6个字符' },
                { max: 14, message: '密码长度不能超过14个字符' },
              ]}
            >
              <Input.Password allowClear />
            </Form.Item>
            <Form.Item
              label={null}
              name="agree"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('请勾选协议'))),
                },
              ]}
            >
              <Checkbox className={style.checkbox} style={{ marginLeft: 22 }}>
                我已同意隐私条款和服务条款
              </Checkbox>
            </Form.Item>
            <Form.Item label={null}>
              <Button loading={loading} type="primary" style={{ width: '100%', height: 40 }} htmlType="submit">
                点击登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      <FooterInfo bgColor="#fff" />
    </div>
  );
}
