import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import Home from "./pages/Home";
import PlanDetails from "./pages/PlanDetails";
import FoodDetail from "./pages/FoodDetail";
import KitchenDetail from "./pages/KitchenDetail";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Chat from "./pages/Chat";
import ChatConversation from "./pages/ChatConversation";
import Profile from "./pages/Profile";
import Addresses from "./pages/Addresses";
import PaymentMethods from "./pages/PaymentMethods";
import NotificationSettings from "./pages/NotificationSettings";
import PrivacySecurity from "./pages/PrivacySecurity";
import HelpSupport from "./pages/HelpSupport";
import AppSettings from "./pages/AppSettings";
import ManageSubscription from "./pages/ManageSubscription";
import EditMeals from "./pages/EditMeals";
import CakeDetail from "./pages/CakeDetail";
import BakerPortfolio from "./pages/BakerPortfolio";
import CakeInquiry from "./pages/CakeInquiry";
import InquiryDetail from "./pages/InquiryDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "plan/:id", Component: PlanDetails },
      { path: "orders", Component: Orders },
      { path: "order/:id", Component: OrderDetail },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "chat", Component: Chat },
      { path: "chat/:id", Component: ChatConversation },
      { path: "food/:id", Component: FoodDetail },
      { path: "cake/:id", Component: CakeDetail },
      { path: "kitchen/:id", Component: KitchenDetail },
      { path: "profile", Component: Profile },
      { path: "cake-inquiry", Component: CakeInquiry },
      { path: "inquiry/:id", Component: InquiryDetail },
      { path: "baker/portfolio", Component: BakerPortfolio },
      { path: "addresses", Component: Addresses },
      { path: "payment-methods", Component: PaymentMethods },
      { path: "notifications", Component: NotificationSettings },
      { path: "privacy", Component: PrivacySecurity },
      { path: "help-support", Component: HelpSupport },
      { path: "settings", Component: AppSettings },
      { path: "subscription/manage", Component: ManageSubscription },
      { path: "subscription/edit-meals", Component: EditMeals },
      { path: "*", Component: Home },
    ],
  },
]);
