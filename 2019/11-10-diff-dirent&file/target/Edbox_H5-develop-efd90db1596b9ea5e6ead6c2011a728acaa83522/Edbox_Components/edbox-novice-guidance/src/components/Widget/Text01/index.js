import React, { PureComponent } from 'react';
import { Input, Button, message, Popover } from 'antd';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';
import { trim } from '@/utils/helper.js';
import styles from './index.scss';
import StepGuideModal from '@/components/StepGuideModal';

const { Edbox } = window;

@connect(({ global, edit, loading }) => ({
  global,
  edit,
  loading: true,
}))
class Text01 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      valueLength: 0,
      initialValue: this.props.config.Value,
      config: this.props.config,
      controls: this.props.controls,
    };
    this.isChecking = false;
  }

  handleChangeValue = e => {
    const { config } = this.state;
    const { IsRequired = false,Length } = config;
    const value = e.target.value;
    let valueLength;

    if (!value && IsRequired) {
      config.ErrorText = formatMessage({ id: 'required_text' });
    } else {
      config.ErrorText = '';
    }

    // config.Value = value;
    if (Length) {
      Edbox.MMO.GetStrLen(
        value,
        len => {
          valueLength = len > Length ? Length : len;
          Edbox.MMO.SubStrLen(
            value,
            valueLength,
            data => {
              config.Value = data;
            },
            err => {
              console.log(err);
            },
          );
        },
        err => {
          console.log(err);
        },
      );
    } else {
      valueLength = 0;
      config.Value = value;
    }
    this.setState({
      valueLength: valueLength,
      config: {
        ...config,
      },
    });
  };

  // 设置激活/冻锁设置步骤
  setStepPower = val => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/setIsCanBeSetStep',
      payload: {
        isCanBeSetStep: val,
      },
    });
  };
  handleBlur = () => {
    const { initialValue, config } = this.state;
    const { Value, IsRequired = false } = config;
    // const requiredText = formatMessage({ id: 'required_text' });
    const sensitiveText = formatMessage({ id: 'sensitive_text' });

    this.setStepPower(false);

    config.Value = trim(Value);
    if (!Value) {
      if (IsRequired) {
        config.Value = initialValue;
        // this.setStepPower(true);
      }
    }
    this.isChecking = true;
    if (config.Value) {
      // 特殊字符过滤：\/:*?"<>|[]:（\u005c）（\u002f）（\u003a）（\u002a）（\u003f）（\u0022）（\u003c）（\u003e）（\u005d）
      const reg = /[\u2572|\u201c|\u201d|\<|\>|\u007c|\u005c|\u002f|\u003a|\u002a|\u003f|\u0022|\u003c|\u003e|\u005d|\u005b]/g;
      if(reg.test(config.Value)){
        this.isChecking = false;

        const setArr = Array.from(new Set(config.Value.match(reg)));
        let errHtml = '';
        errHtml = setArr[0];
        config.ErrorText = formatMessage({id:'error_tip_special_characters'})+formatMessage({id:'left_quotation'})+ errHtml+formatMessage({id:'right_quotation'});

        this.setStepPower(false);
      }else{
        // 特殊字符检测成功
        config.ErrorText = '';
        Edbox.Editor.IsSensitive(
          config.Value,
          flag => {
            if (flag.is_sensitive) {
              this.isChecking = false;
              config.ErrorText = sensitiveText;

              this.setStepPower(false);

              this.setState({
                config: { ...config },
              });

              this.props.onUpdate(config);

              return false;
            } else {
              config.ErrorText = '';
              // console.log('------1111:',Edbox.GameId);
              if(Edbox.GameId){
                // 重名检测
                Edbox.MMO.IsNameDuplicate(
                  Edbox.GameId,
                  1,
                  config.Value,
                  2,
                  success => {
                    this.isChecking = false;
                    if (!success.is_duplicate) {
                      // 重名检测成功
                      this.setStepPower(true);
                      config.ErrorText = '';

                    } else {
                      this.setStepPower(false);
                      config.ErrorText = formatMessage({ id: 'name_repeat' });
                    }
                    this.setState({
                      config: { ...config },
                    });

                    this.props.onUpdate(config);
                  },
                  error => {
                    this.isChecking = false;
                    message.error(error);
                  },
                );
              }else{
                this.isChecking = false;
                this.setStepPower(true);
                config.ErrorText = '';
                this.setState({
                  config: { ...config },
                });

                this.props.onUpdate(config);
              }

            }
          },
          error => {
            console.log(error);
          },
        );
      }


    }
  };

  handleEdit = () => {
    const { config } = this.state;
    this.props.onArouse(config);
  };

  componentDidMount(){
    const { config } = this.props;

    Edbox.MMO.GetStrLen(
      config.Value,
      len => {
        this.setState({
          valueLength: len,
        });
      },
      err => {
        console.log(err);
      },
    );
  }

  componentWillReceiveProps(nextProps) {
    const { config } = nextProps;
    // const { Value, Length } = config;

    // config.Value = Length && Value.length > Length ? Value.substring(0, Length) : Value;
    // this.setState({
    //   initialValue: config.Value,
    //   // config: { ...config },
    //   controls: { ...nextProps.controls },
    // });

    Edbox.MMO.GetStrLen(
      config.Value,
      len => {
        this.setState({
          valueLength: len,
          initialValue: config.Value,
          // config: { ...config },
          controls: { ...nextProps.controls },
        });
      },
      err => {
        console.log(err);
      },
    );
  }

  guideGoToNext = () => {
    const loop = () => {
      if (this.isChecking) {
        return requestAnimationFrame(loop);
      }

      const {
        dispatch,
        global: { isCanBeSetStep },
        mainStep: { step },
      } = this.props;
      // console.log('guideGoToNext isCanBeSetStep >>>>>', isCanBeSetStep)
      if (isCanBeSetStep) {
        dispatch({
          type: 'global/setStep',
          payload: {
            activeStep: step + 1,
          },
        });

        dispatch({
          type: 'global/setIsCanOpr',
          payload: {
            isCanOpr: false,
          },
        });
      }
    };
    loop();
  };

  render() {
    const {
      valueLength,
      config: {
        ID,
        Value = '',
        Length,
        ReadOnly = false,
        StyleEdit = true,
        InputHintText = '',
        ErrorText = '',
        Width,
      },
      controls,
    } = this.state;

    const {
      mainStep,
      global: { activeStep },
    } = this.props;
    const footer = [
      <Button key="setname" type="primary" onClick={this.guideGoToNext}>
        {formatMessage({ id: 'g_tip_ok_game_name_next' })}
      </Button>,
    ];

    return (
      <div style={{ width: Width ? `${Width}px` : `100%` }}>
        <div
          className={Length ? `${styles['input-box']} ${styles['length']}` : styles['input-box']}
        >
          {mainStep ? (
            <StepGuideModal
              step={mainStep.step}
              isFixed={mainStep.isFixed}
              handStyle={mainStep.handStyle}
              popStyle={mainStep.popStyle}
              placement={mainStep.placement}
              isNeedLeftRightByArrow={mainStep.isNeedLeftRightByArrow}
              width={mainStep.width}
              title={mainStep.title}
              isNeedHand={mainStep.isNeedHand}
              footer={footer}
            >
              <Input
                className={controls && controls.ID === ID ? `${styles['active']}` : null}
                value={Value}
                placeholder={InputHintText}
                disabled={ReadOnly}
                maxLength={Length ? Length : null}
                onChange={e => this.handleChangeValue(e)}
                onBlur={this.handleBlur}
                autoFocus={mainStep.step === activeStep ? 'autofocus' : null}
              />
            </StepGuideModal>
          ) : (
            <Input
              className={controls && controls.ID === ID ? `${styles['active']}` : null}
              value={Value}
              placeholder={InputHintText}
              disabled={ReadOnly}
              maxLength={Length ? Length : null}
              onChange={e => this.handleChangeValue(e)}
              onBlur={this.handleBlur}
            />
          )}
          {Length ? (
            <div className={styles['max-mun-box']}>
              <span className={styles['cur-num']}>{valueLength}</span>
              <span>/{Length}</span>
            </div>
          ) : null}
          {StyleEdit ? (
            <Popover placement="bottom" content={formatMessage({ id: 'text_edit_tip' })}>
              <Button
                className={
                  controls && controls.ID === ID
                    ? `${styles['btn-edit']} ${styles['active']}`
                    : styles['btn-edit']
                }
                shape="circle"
                onClick={() => this.handleEdit()}
              >
                <span className={styles.editIcon} />
              </Button>
            </Popover>
          ) : null}
        </div>
        {ErrorText ? <p className={styles['widget-item-error']}>{ErrorText}</p> : null}
      </div>
    );
  }
}

export default Text01;
