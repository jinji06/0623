import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import { Menu,Layout } from 'antd';
import BlankPage from "./BlankPage";
import LoginPage from "./LoginPage";
import UserEdit from "./UserEdit";
import MyPage from "./MyPage";
import MainLayout from "./Layout";
import ItemPage from "./ItemPage";
import MonthlySummaryPage from "./MonthlySummaryPage";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App({ signOut, user }) {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<ItemPage />} />
          <Route path="/blank" element={<BlankPage />} />
          <Route path="/user_edit" element={<UserEdit />} />
          <Route path="/my_page" element={<MyPage />} />
          <Route path="/summary" element={<MonthlySummaryPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default withAuthenticator(App);
