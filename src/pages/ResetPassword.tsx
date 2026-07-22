import { useSearchParams, useNavigate } from 'react-router-dom';

export const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();
}
