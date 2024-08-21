import { ModalAction } from "./ModalAction";
import { ModalContent } from "./ModalContent";
import { ModalRoot } from "./ModalRoot";
import { ModalTitle } from "./ModalTitle";


// Composition Pattern
export const Modal = {
  Title: ModalTitle,
  Content: ModalContent,
  Action: ModalAction,
  Root: ModalRoot
}