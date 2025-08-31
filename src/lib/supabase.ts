import { createClient, RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { Note } from '@/modules/notes/note.entity';

export const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_API_KEY
);


export const subscribe = (
    useId:string, 
    callback:(payload: RealtimePostgresChangesPayload<Note>) => void
) => {
    return supabase
    .channel('notes-changes') // subscribeのチャンネル名
    .on<Note>(
        'postgres_changes',
        {
            event: '*', // すべての変更を監視
            schema: 'public',
            table: 'notes',
            filter: `user_id=eq.${useId}`
        },
        callback // コールバック関数
    ).subscribe()
};

export const unsubscribe = (channel: RealtimeChannel) => {
    supabase.removeChannel(channel);
};
