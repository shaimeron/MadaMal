import {styleType} from "@/models";

export const style: styleType = {
  cardContainer: {
    width: "100%",
  },
  cardHeader: {
    paddingBottom: 0,
    "& .MuiCardHeader-content ": {
      display: "flex",
      alignItems: "center",
    },
    "& .MuiCardHeader-subheader  ": {
      paddingRight: "6px",
    },
  },
  cardButton: {
    cursor: "pointer",
  },
};
