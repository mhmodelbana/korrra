import { supabase } from '../supabase.js';

export const ProfileService = {

    async getProfile(userId) {

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            throw error;
        }

        return data;
    },


    async updateProfile(userId, profileData) {

        const { data, error } = await supabase
            .from('profiles')
            .update(profileData)
            .eq('id', userId)
            .select();

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) {
            throw new Error(
                'لم يتم العثور على بيانات اللاعب أو لا توجد صلاحية لتعديلها'
            );
        }

        return data[0];
    },


    async getAllProfiles() {

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        return data;
    },


    async getUserStats(userId) {

        const {
            data: approvedMatches,
            error: approvedError
        } = await supabase
            .from('match_players')
            .select('match_id')
            .eq('user_id', userId)
            .eq('status', 'approved');

        if (approvedError) {
            throw approvedError;
        }


        const {
            data: pendingRequests,
            error: pendingError
        } = await supabase
            .from('match_players')
            .select('match_id')
            .eq('user_id', userId)
            .eq('status', 'pending');

        if (pendingError) {
            throw pendingError;
        }


        return {
            total_matches: approvedMatches.length,
            pending_requests: pendingRequests.length
        };
    }

};
