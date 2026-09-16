import { supabase } from './supabase.js';
import { UI } from './ui.js';

export const Auth = {
    currentUser: null,
    userProfile: null,

    // Initialize auth state listener
    init() {
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                this.currentUser = session.user;
                await this.loadUserProfile();
            } else if (event === 'SIGNED_OUT') {
                this.currentUser = null;
                this.userProfile = null;
                window.location.href = 'login.html';
            }
        });
    },

    // Get current session
    async getSession() {
        const {
            data: { session },
            error
        } = await supabase.auth.getSession();

        if (error) {
            console.error('Error getting session:', error);
            return null;
        }

        return session;
    },

    // Get current user
    async getUser() {
        const {
            data: { user },
            error
        } = await supabase.auth.getUser();

        if (error) {
            console.error('Error getting user:', error);
            return null;
        }

        return user;
    },

    // Load user profile
    async loadUserProfile() {
        if (!this.currentUser) {
            return null;
        }

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', this.currentUser.id)
            .single();

        if (error) {
            console.error('Error loading profile:', error);
            this.userProfile = null;
            return null;
        }

        this.userProfile = data;
        return data;
    },

    // Get user role
    async getUserRole() {
        if (!this.userProfile) {
            await this.loadUserProfile();
        }

        return this.userProfile?.role || 'player';
    },

    // Check if user is admin
    async isAdmin() {
        const role = await this.getUserRole();
        return role === 'admin';
    },

    // Check if user is authenticated
    isAuthenticated() {
        return this.currentUser !== null;
    },

    // Sign up
    async signUp(email, password, name) {
        const { data, error } = await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
                data: {
                    name: name.trim()
                }
            }
        });

        if (error) {
            console.error('Sign up error:', error);
            UI.showToast(error.message, 'error');
            return {
                success: false,
                error
            };
        }

        UI.showToast('تم إنشاء الحساب بنجاح', 'success');

        return {
            success: true,
            data
        };
    },

    // Sign in
    async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password
        });

        if (error) {
            console.error('Login error:', error);
            UI.showToast(error.message, 'error');

            return {
                success: false,
                error
            };
        }

        this.currentUser = data.user;

        const profile = await this.loadUserProfile();

        console.log('Logged in user:', this.currentUser);
        console.log('User profile:', profile);
        console.log('User role:', profile?.role);

        if (!profile) {
            UI.showToast(
                'تم تسجيل الدخول ولكن لم يتم العثور على ملف المستخدم',
                'error'
            );

            return {
                success: false
            };
        }

        if (profile.role === 'admin') {
            window.location.href = './admin/index.html';
        } else {
            window.location.href = './dashboard.html';
        }

        return {
            success: true,
            data
        };
    },

    // Sign out
    async signOut() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            UI.showToast(error.message, 'error');

            return {
                success: false,
                error
            };
        }

        this.currentUser = null;
        this.userProfile = null;

        window.location.href = 'login.html';

        return {
            success: true
        };
    },

    // Auth guard for protected routes
    async requireAuth() {
        const session = await this.getSession();

        if (!session) {
            window.location.href = 'login.html';
            return false;
        }

        this.currentUser = session.user;

        const profile = await this.loadUserProfile();

        if (!profile) {
            UI.showToast(
                'تعذر تحميل بيانات المستخدم',
                'error'
            );

            return false;
        }

        return true;
    },

    // Admin guard
    async requireAdmin() {
        const isAuth = await this.requireAuth();

        if (!isAuth) {
            return false;
        }

        const isAdmin = await this.isAdmin();

        if (!isAdmin) {
            UI.showToast(
                'ليس لديك صلاحية للوصول لهذه الصفحة',
                'error'
            );

            window.location.href = '../dashboard.html';

            return false;
        }

        return true;
    }
};
