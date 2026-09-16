import { supabase } from '../supabase.js';

export const ProfileService = {
    // Get user profile
    async getProfile(userId) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data;
    },

    // Update user profile
    async updateProfile(userId, profileData) {
        const { data, error } = await supabase
            .from('profiles')
            .update(profileData)
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Get all profiles (admin only)
    async getAllProfiles() {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Get user statistics
    async getUserStats(userId) {
        const { data: approvedMatches, error: approvedError } = await supabase
            .from('match_players')
            .select('match_id')
            .eq('user_id', userId)
            .eq('status', 'approved');

        if (approvedError) throw approvedError;

        const { data: pendingRequests, error: pendingError } = await supabase
            .from('match_players')
            .select('match_id')
            .eq('user_id', userId)
            .eq('status', 'pending');

        if (pendingError) throw pendingError;

        return {
            total_matches: approvedMatches.length,
            pending_requests: pendingRequests.length
        };
    }
};
