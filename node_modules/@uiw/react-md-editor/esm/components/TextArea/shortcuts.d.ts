import { ICommand, TextAreaCommandOrchestrator } from '../../commands';
import { ContextStore, ExecuteCommandState } from '../../Context';
export default function shortcutsHandle(e: KeyboardEvent | React.KeyboardEvent<HTMLTextAreaElement>, commands?: ICommand[], commandOrchestrator?: TextAreaCommandOrchestrator, dispatch?: React.Dispatch<ContextStore>, state?: ExecuteCommandState): void;
