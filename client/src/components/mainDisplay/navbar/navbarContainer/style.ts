import {styleType} from "@/models";

export const style: styleType = {
  itemContainer: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  nameContainer: { flex: 1, display: "flex", justifyContent: "center" },
  weatherContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  linkList: { display: "flex" },
  linkListItemButton: { textAlign: "center", width: "max-content" },
  containerBox: {
    flexGrow: 1,
  },
};
