import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

export const emailState = atom({
  key: "emailState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export const displayNameState = atom({
  key: "displayNameState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export const passwordState = atom({
  key: "passwordState",
  default: "",
});
