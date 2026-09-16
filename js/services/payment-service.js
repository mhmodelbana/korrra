import { supabase } from '../supabase.js';

export const PaymentService = {
    // Get all payments (admin only)
    async getAllPayments() {
        const { data, error } = await supabase
            .from('payments')
            .select(`
                *,
                profiles:user_id(name, email),
                matches:match_id(title, match_date)
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Get user payments
    async getUserPayments(userId) {
        const { data, error } = await supabase
            .from('payments')
            .select(`
                *,
                matches:match_id(title, match_date)
            `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Create payment
    async createPayment(paymentData) {
        const { data, error } = await supabase
            .from('payments')
            .insert([{
                user_id: paymentData.user_id,
                match_id: paymentData.match_id,
                amount: paymentData.amount,
                status: paymentData.status || 'pending',
                payment_method: paymentData.payment_method
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update payment status
    async updatePaymentStatus(paymentId, status) {
        const { data, error } = await supabase
            .from('payments')
            .update({ status })
            .eq('id', paymentId)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};
