import { Divider, Space, Flex, Image, Button } from 'antd';
import { useUserStore } from '@/store/userStore';
import styles from './Footer.module.css';
import app from '@/assets/images/qrcode.jpg';

export function FooterInfo() {
  const { isLogin } = useUserStore();

  return (
    <div>
      {isLogin && (
        <div className={styles.contract}>
          <Flex justify="space-between" align="center">
            <div className={styles.contractItem}>
              <div>客户服务</div>
              <Flex>
                <div className={styles.contractCard}>
                  <i className="iconfont icon-kefu"></i>
                  <div>在线客服</div>
                </div>
                <div className={styles.contractCard}>
                  <i className="iconfont icon-question"></i>
                  <div>问题反馈</div>
                </div>
              </Flex>
            </div>
            <Divider type="vertical" className={styles.contractDivider} />
            <div className={styles.contractItem}>
              <div>关注我们</div>
              <Flex>
                <div className={styles.contractCard}>
                  <i className="iconfont icon-weixin"></i>
                  <div>公众号</div>
                </div>
                <div className={styles.contractCard}>
                  <i className="iconfont icon-weibo"></i>
                  <div>微博</div>
                </div>
              </Flex>
            </div>
            <Divider type="vertical" className={styles.contractDivider} />
            <div className={styles.contractItem}>
              <div>客户服务</div>
              <Flex>
                <div className={styles.contractCard}>
                  <Image width={77} height={77} src={app} alt="下载APP" preview={false} />
                </div>
                <Flex vertical align="center" justify="space-around">
                  <div>扫描二维码</div>
                  <div>立马下载APP</div>
                  <Button type="primary">下载页面</Button>
                </Flex>
              </Flex>
            </div>
            <Divider type="vertical" className={styles.contractDivider} />
            <div className={styles.contractItem}>
              <div>服务热线</div>
              <div className={styles.contractHotline}>
                <div>400-0000-000</div>
                <div>周一至周日 8:00-18:00</div>
              </div>
            </div>
          </Flex>
        </div>
      )}

      {isLogin && (
        <div className={styles.slogan}>
          <Flex justify="space-between" align="center">
            <Flex align="center">
              <i className="iconfont icon-footer01"></i>
              <span>价格亲民</span>
            </Flex>
            <Flex align="center">
              <i className="iconfont icon-footer02"></i>
              <span>物流快捷</span>
            </Flex>
            <Flex align="center">
              <i className="iconfont icon-footer03"></i>
              <span>品质新鲜</span>
            </Flex>
          </Flex>
        </div>
      )}

      <div className={styles.links} style={{ background: isLogin ? '#333' : '#fff' }}>
        <Flex justify="center">
          <Space split={<Divider type="vertical" className={styles.divider} />}>
            <span className={styles.linkItem}>关于我们</span>
            <span className={styles.linkItem}>帮助中心</span>
            <span className={styles.linkItem}>售后服务</span>
            <span className={styles.linkItem}>配送与验收</span>
            <span className={styles.linkItem}>商务合作</span>
            <span className={styles.linkItem}>搜索推荐</span>
            <span className={styles.linkItem}>友情链接</span>
          </Space>
        </Flex>
        <div className={styles.copyright}>Copyright © 小兔鲜儿</div>
      </div>
    </div>
  );
}
