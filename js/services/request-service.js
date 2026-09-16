import { supabase } from '../supabase.js';

export const RequestService = {
    // Get all requests for a match
    async getMatchRequests(matchId) {
        const { data, error } = await supabase
            .from('match_players')
            .select(`
                *,
                profiles:user_id(name, email)
            `)
            .eq('match_id', matchId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Get all requests across all matches (admin only)
    async getAllRequests() {
        const { data, error } = await supabase
            .from('match_players')
            .select(`
                *,
                profiles:user_id(name, email),
                matches:match_id(title, match_date)
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Get user's requests
    async getUserRequests(userId) {
        const { data, error } = await supabase
            .from('match_players')
            .select(`
                *,
                matches:match_id(title, match_date, start_time, total_cost, max_players)
            `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

        // Get all players for all matches
    async getAllMatchPlayers() {
        const { data, error } = await supabase
            .from('match_players')
            .select('id, match_id, user_id, status, created_at');

        if (error) throw error;
        return data;
    },

    // Create join request
    async createJoinRequest(matchId, userId) {
        // Check if request already exists
        const { data: existing } = await supabase
            .from('match_players')
            .select('*')
            .eq('match_id', matchId)
            .eq('user_id', userId)
            .single();

        if (existing) {
            throw new Error('لديك طلب بالفعل لهذه المباراة');
        }

        const { data, error } = await supabase
            .from('match_players')
            .insert([{
                match_id: matchId,
                user_id: userId,
                status: 'pending'
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Approve request
    async approveRequest(requestId) {
        const { data, error } = await supabase
            .from('match_players')
            .update({ status: 'approved' })
            .eq('id', requestId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Reject request
    async rejectRequest(requestId) {
        const { data, error } = await supabase
            .from('match_players')
            .update({ status: 'rejected' })
            .eq('id', requestId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Cancel request
    async cancelRequest(requestId) {
        const { error } = await supabase
            .from('match_players')
            .delete()
            .eq('id', requestId);

        if (error) throw error;
        return true;
    },

    // Remove player from match
    async removePlayerFromMatch(requestId) {
        const { error } = await supabase
            .from('match_players')
            .delete()
            .eq('id', requestId);

        if (error) throw error;
        return true;
    }
};
