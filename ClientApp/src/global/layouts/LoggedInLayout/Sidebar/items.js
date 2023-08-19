import AnalyticsTwoToneIcon from "@mui/icons-material/AnalyticsTwoTone";
import HealthAndSafetyTwoToneIcon from "@mui/icons-material/HealthAndSafetyTwoTone";
import AssignmentIndTwoToneIcon from "@mui/icons-material/AssignmentIndTwoTone";
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";
import VpnKeyTwoToneIcon from "@mui/icons-material/VpnKeyTwoTone";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import DesignServicesTwoToneIcon from "@mui/icons-material/DesignServicesTwoTone";
import SupportTwoToneIcon from "@mui/icons-material/SupportTwoTone";
import ReceiptTwoToneIcon from "@mui/icons-material/ReceiptTwoTone";
import BackupTableTwoToneIcon from "@mui/icons-material/BackupTableTwoTone";
import SmartToyTwoToneIcon from "@mui/icons-material/SmartToyTwoTone";
import {
  EmojiEventsTwoTone,
  HomeTwoTone,
  PersonOutlineTwoTone,
} from "@mui/icons-material";

const menuItems = [
  {
    heading: "General",
    items: [
      {
        name: "Home",
        icon: HomeTwoTone,
        link: "/home",
      },
      {
        name: "Leagues",
        icon: SmartToyTwoToneIcon,
        link: "/my-leagues",
      },
      {
        name: "League Search",
        icon: SmartToyTwoToneIcon,
        link: "/league-search",
      },
      {
        name: "Fixtures",
        icon: HealthAndSafetyTwoToneIcon,
        link: "/boxed-sidebar/blocks",
      },
      {
        name: "Statistics",
        icon: AnalyticsTwoToneIcon,
        link: "/boxed-sidebar/applications",
      },
    ],
  },
  {
    heading: "Management",
    items: [
      {
        name: "Your Profile",
        icon: PersonOutlineTwoTone,
        link: "/profile",
      },
      {
        name: "Messages",
        icon: AccountTreeTwoToneIcon,
        link: "/messages",
      },
    ],
  },
  {
    heading: "Admin",
    items: [
      {
        name: "League Admin",
        icon: EmojiEventsTwoTone,
        link: "/league-admin",
      },
      {
        name: "Users",
        icon: AssignmentIndTwoToneIcon,
        link: "/users",
      },
    ],
  },
];

export default menuItems;
