import { supabase } from '../supabase.js';

export const MatchService = {
    // Get all matches
    async getAllMatches() {
        const { data, error } = await supabase
            .from('matches')
            .select('*')
            .order('match_date', { ascending: true });

        if (error) throw error;
        return data;
    },

    // Get match by ID
    async getMatchById(matchId) {
        const { data, error } = await supabase
            .from('matches')
            .select('*')
            .eq('id', matchId)
            .single();

        if (error) throw error;
        return data;
    },

    // Create new match
    async createMatch(matchData) {
        const { data, error } = await supabase
            .from('matches')
            .insert([{
                title: matchData.title,
                pitch_name: matchData.pitch_name,
                match_date: matchData.match_date,
                start_time: matchData.start_time,
                end_time: matchData.end_time,
                total_cost: matchData.total_cost,
                max_players: matchData.max_players,
                notes: matchData.notes || null
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update match
    async updateMatch(matchId, matchData) {
        const { data, error } = await supabase
            .from('matches')
            .update(matchData)
            .eq('id', matchId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete match
    async deleteMatch(matchId) {
        const { error } = await supabase
            .from('matches')
            .delete()
            .eq('id', matchId);

        if (error) throw error;
        return true;
    },

    // Get match with players count
    async getMatchWithStats(matchId) {
        const { data: match, error: matchError } = await supabase
            .from('matches')
            .select('*')
            .eq('id', matchId)
            .single();

        if (matchError) throw matchError;

        const { data: bookings, error: bookingsError } = await supabase
            .from('match_players')
            .select('*')
            .eq('match_id', matchId);

        if (bookingsError) throw bookingsError;

        const approvedCount = bookings.filter(b => b.status === 'approved').length;
        const pendingCount = bookings.filter(b => b.status === 'pending').length;

        return {
            ...match,
            approved_players: approvedCount,
            pending_players: pendingCount,
            available_spots: match.max_players - approvedCount
        };
    },

    // Calculate player share
    calculatePlayerShare(totalCost, approvedCount) {
        if (approvedCount === 0) return totalCost;
        return Math.round((totalCost / approvedCount) * 100) / 100;
    }
};
