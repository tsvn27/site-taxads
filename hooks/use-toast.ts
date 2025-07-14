import { toast as sonnerToast } from 'sonner';

type ToastOptions = {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  duration?: number;
};

const toast = (options: ToastOptions) => {
  const { title, description, variant = 'default', duration = 5000 } = options;

  switch (variant) {
    case 'success':
      sonnerToast.success(title, { description, duration });
      break;
    case 'destructive':
      sonnerToast.error(title, { description, duration });
      break;
    case 'warning':
      sonnerToast.warning(title, { description, duration });
      break;
    case 'info':
      sonnerToast.info(title, { description, duration });
      break;
    default:
      sonnerToast(title, { description, duration });
      break;
  }
};

const useToast = () => {
  return { toast };
};

export { useToast, toast };
