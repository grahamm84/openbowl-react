import AnalyticsTwoToneIcon from "@mui/icons-material/AnalyticsTwoTone";
import HealthAndSafetyTwoToneIcon from "@mui/icons-material/HealthAndSafetyTwoTone";
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import BackupTableTwoToneIcon from "@mui/icons-material/BackupTableTwoTone";
import SmartToyTwoToneIcon from "@mui/icons-material/SmartToyTwoTone";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import { LineAxisTwoTone } from "@mui/icons-material";

const menuItems = [
  {
    heading: "",
    items: [
      {
        name: "Dashboards",
        icon: SmartToyTwoToneIcon,
        link: "/top-navigation/dashboards",
      },
      {
        name: "Leagues",
        icon: HealthAndSafetyTwoToneIcon,
        badge: "",
        link: "/my-leagues",
      },
      {
        name: "Fixtures",
        icon: HealthAndSafetyTwoToneIcon,
        badge: "",
        link: "/top-navigation/blocks",
      },
      {
        name: "Results",
        icon: AnalyticsTwoToneIcon,
        link: "/top-navigation/applications",
      },
      {
        name: "Standings",
        icon: AccountTreeTwoToneIcon,
        link: "/top-navigation/management/projects/list",
      },
      {
        name: "Statistics",
        icon: LineAxisTwoTone,
        link: "/top-navigation/management/projects/list",
      },
      {
        name: "Admin",
        icon: MenuTwoToneIcon,
        link: "/users",
      },
    ],
  },
];

export default menuItems;
