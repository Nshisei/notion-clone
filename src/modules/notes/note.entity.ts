import { Database } from 'database.types';

// database.types.ts内で定義されているテーブルのRowをNoteとしてインポート
// npx supabase gen types --lang=typescript --project-id "ncixbcyqhzkalkrmaeii" --schema public > database.types.ts
export type Note = Database['public']['Tables']['notes']['Row'];