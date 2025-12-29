import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { authApi } from '@shared/api';
import { logout as logoutAction } from '@shared/redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
// import { useNavigator } from '@shared/utils/navigator';

export const useLogout = () => {
	const dispatch = useDispatch();
	const navigateTo = useNavigate();

	const logoutMutation = useMutation({
		mutationFn: () => authApi.logout(),
		onSuccess: () => {
			// Dispatch logout action to clear Redux state and localStorage
			dispatch(logoutAction());

			// Navigate to login
			navigateTo('/login', { replace: true });
		},
	});

	const logout = () => {
		logoutMutation.mutate();
	};

	return {
		logout,
		isLoading: logoutMutation.isPending,
	};
};
