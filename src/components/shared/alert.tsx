import { AlertCircle, CircleCheck, CircleX } from 'lucide-react';
type status = "warning" | "error" | "success"
interface ErrorAlertProps {
   message: string;
   status?: status;
}


export function Alert({ message, status = 'warning' }: ErrorAlertProps) {

   const alertStyle =
      status == 'error' ? "bg-red-50 border-red-500 text-red-500" :
         status == 'warning' ?
            "bg-orange-50 border-orange-500 text-orange-500" :
            "bg-green-50 border-green-600 text-green-600"
   return (
      <div className={`relative border-l-4 p-4 my-10 rounded-md shadow-sm ${alertStyle}`
      }>
         <div className="flex items-center">
            <div className="flex-shrink-0">
               {status == 'success' ? <CircleCheck className={`h-5 w-5 ${alertStyle} `} /> :
                  status == 'warning' ? <AlertCircle className={`h-5 w-5 ${alertStyle} `} />
                     :
                     <CircleX className={`h-5 w-5 ${alertStyle} `} />
               }
            </div>
            <div className="ms-3 text-center">
               <p className="text-sm">{message}</p>
            </div>

         </div>
      </div >
   );
}

