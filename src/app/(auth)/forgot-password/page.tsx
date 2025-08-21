import { ForgotForm } from '@/components/layout/auth/forms/forgot-form'
import { useTranslations } from "next-intl";

const ForgotPage = () => {
  const t = useTranslations("auth");
  return (
    <div className="container">
        <h1>{t("forgotPassword")}</h1>
        <ForgotForm />
    </div>
  )
}

export default ForgotPage