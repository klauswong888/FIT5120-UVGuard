import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useEffect } from "react";
import { setRecommendation, setReapplyTime, setIsSafeToGoOut } from "./uvSlice";
import { supabase } from "../utils/supabaseClient";

// Create type-safe Hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// ✅ Add useFetchRecommendations Hook
export const useFetchRecommendations = () => {
    const dispatch = useAppDispatch();
    const { uvIndex, skinTone } = useAppSelector(state => state.uv);

    // Fetch UV recommendations
    useEffect(() => {
        if (uvIndex !== null) {
            fetchUVRecommendation();
        }
    }, [uvIndex]);

    // Fetch reapply time
    useEffect(() => {
        if (skinTone) {
            fetchReapplyTime();
        }
    }, [skinTone]);

    const fetchUVRecommendation = async () => {
        console.log("Fetching UV recommendation for uvIndex:", uvIndex);

        try {
            const { data, error } = await supabase
                .from("uv_recommendations")
                .select("recommendation, is_safe_to_go_out")
                .lte("uv_min", uvIndex)  // ✅ UV index must be greater than or equal to the minimum value
                .gte("uv_max", uvIndex)  // ✅ UV index must be less than or equal to the maximum value
                .maybeSingle();  // 🔥 Avoid "multiple rows" error

            if (error) {
                console.error("Error fetching UV recommendation:", error);
                return;
            }

            if (!data) {
                console.warn("No matching UV recommendation found.");
                return;
            }

            console.log("Fetched UV recommendation:", data);
            dispatch(setRecommendation(data.recommendation));
            dispatch(setIsSafeToGoOut(data.is_safe_to_go_out));
        } catch (err) {
            console.error("Exception fetching UV recommendation:", err);
        }
    };

    const fetchReapplyTime = async () => {
        const { data, error } = await supabase
            .from("skin_tone_reapply")
            .select("reapply_time")
            .eq("skin_tone", skinTone)
            .maybeSingle();

        if (!error && data) {
            dispatch(setReapplyTime(data.reapply_time));
        }
    };
};