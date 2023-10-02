import { FC } from 'react';

interface MessageProps {
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: FC<MessageProps> = (props) => {
  return <dialog>
    {props.title && <div>{props.title}</div>}
    <div>{props.message}</div>
    <button onClick={props.onConfirm}>Yes</button>
    <button onClick={props.onCancel}>Cancel</button>
  </dialog>
}
