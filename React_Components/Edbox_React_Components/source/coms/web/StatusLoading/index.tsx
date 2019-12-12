import styles from "./index.scss";
import { versionGT } from "@/utils/version";
import failPicSrc from "@/assets/connect_fail.png";

// src:图片链接,传值时图片懒加载，不传时作为无进度组件1
// scale:动画缩放
// reload:点击重新加载按钮
// pageTab:游戏列表页切换时的loading

interface StatusLoadingProps {
    src?: string;
    scale?: number;
    reload?: Function;
    timeout?: number;
    pageTab?: boolean;
    fullWindow?: boolean;
    height?: number;
    backgroundColor?: string;
    React: any;
    formatMessage: (obj: { id: string }) => string;
}
export default (props: StatusLoadingProps) => {
    // timeout:sdk所有请求默认timeout为60s
    const {
        src,
        scale,
        reload,
        timeout = 60000,
        pageTab,
        fullWindow,
        height,
        backgroundColor = "#fff",
        formatMessage,
        React
    } = props;

    if (!versionGT(React, "16.8.0")) {
        return "";
    }

    const { useState, useEffect, Fragment } = React;
    const [loaded, setLoaded] = useState(false);
    const [overTime, setOverTime] = useState(false);
    let clock: any;

    const initClock = function() {
        clearTimeout(clock);
        return setTimeout(() => {
            setOverTime(true);
            clearTimeout(clock);
        }, timeout);
    };

    useEffect(() => {
        clock = initClock();
        return () => {
            clearTimeout(clock);
        };
    }, []);

    const img = new Image();
    Object.assign(img, { src });
    img.onload = function() {
        setLoaded(true);
    };

    // 大屏loading有失败图
    const failPic =
        pageTab || fullWindow ? (
            <div className={styles.failPic}>
                <img src={failPicSrc} />
            </div>
        ) : null;

    // 无数据提示图片会一直存在，需要靠游戏列表或页面切换时的loading去覆盖，默认撑满父元素高度
    const loadBoxStyle = { zIndex: 10, backgroundColor, width: "100%", height: "100%" };
    // if (pageTab) {
    //   Object.assign(loadBoxStyle, { height: '100%'});
    // }
    if (fullWindow) {
        Object.assign(loadBoxStyle, { position: "fixed" });
    }
    if (height) {
        Object.assign(loadBoxStyle, { height });
    }

    return src && loaded ? (
        <Fragment>
            <img src={src} alt="" />
        </Fragment>
    ) : (
        <div
            className={styles.loadbox}
            style={loadBoxStyle}
            onClick={() => {
                setOverTime(false);
                // 重启定时器
                clock = initClock();
                overTime && reload && typeof reload === "function" && reload();
            }}
        >
            {!overTime ? (
                <div className={styles.load} style={{ transform: `scale(${scale || 1})` }}>
                    {Array.from({ length: 4 }).map((ele, i) => (
                        <span className={styles.loaditem} key={"pic" + i}>
                            <i className={styles.l1}></i>
                            <i className={styles.l2}></i>
                            <i className={styles.l3}></i>
                            <i className={styles.l4}></i>
                        </span>
                    ))}
                </div>
            ) : (
                <div className={styles.fail}>
                    {failPic}
                    <div className={styles.failTxt}>
                        {formatMessage({ id: "load_hint_word" })}，
                        <span className={styles.reload}>{formatMessage({ id: "reload_click_word" })}</span>
                    </div>
                </div>
            )}
        </div>
    );
};
