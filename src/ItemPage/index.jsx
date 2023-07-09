import React, { useContext, useState } from 'react';
import { Button, Modal, Input, Divider } from 'antd';
import AuthContext from '../AuthContext';
import axios from 'axios';

const ItemPage = () => {
  const [size] = useState('large');
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [sellAuMnp,setSellAuMnp] = useState(0);
  const authData = useContext(AuthContext);

  const handleButtonClick = (name) => {
    setSellAuMnp(name);
    setModalVisible(true);
  };

  const handleModalOk = async () => {
    const user_id = authData.sub;
    const headerAuth = { headers: { Authorization: authData.token } };
    try {
      const response = await axios.post(
        'https://zt66dxbrxi.execute-api.ap-northeast-1.amazonaws.com/staging/zisseki',
        { action: 'shop_sell', aumnp:sellAuMnp, description, user_id },
        headerAuth
      );
      console.log(response.data);
      // 成功した場合の処理
    } catch (error) {
      console.error(error);
      // エラーが発生した場合の処理
    }
    setModalVisible(false);
    setDescription('');
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setDescription('');
  };

  return (
    <div style={{ paddingTop: '10px' }}>
      <h1>モバイル台数</h1>
      <Modal
        title="説明文を入力"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Input
          placeholder="説明文を入力してください"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Modal>
      <Button
        type="primary"
        size={size}
        name="1"
        key="1"
        onClick={() => handleButtonClick(1)}
      >
        MNP
      </Button>
      <Button
        type="primary"
        size={size}
        name="au_new"
        key="au_new"
        onClick={() => handleButtonClick(2)}
      >
        新規
      </Button>
      <Button
        type="primary"
        size={size}
        name="au_device"
        key="au_device"
        onClick={() => handleButtonClick(3)}
      >
        機種変更
      </Button>
      <Divider />

      <Button
        type="primary"
        size={size}
        name="uq_new"
        key="uq_new"
        onClick={() => handleButtonClick(4)}
      >
       UQ新規
      </Button>
      <Button
        type="primary"
        size={size}
        name="uq_device"
        key="uq_device"
        onClick={() => handleButtonClick(5)}
      >
       UQ機種変更
      </Button>
    </div>
  );
};

export default ItemPage;
