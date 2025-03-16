import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useEffect } from "react";
import { setRecommendation, setReapplyTime, setIsSafeToGoOut } from "./uvSlice";
import {supabase} from "../utils/supabaseClient";

// 创建类型安全的 Hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// ✅ 添加 useFetchRecommendations Hook
export const useFetchRecommendations = () => {
    const dispatch = useAppDispatch();
    const { uvIndex, skinTone } = useAppSelector(state => state.uv);

    // 查询 UV 建议
    useEffect(() => {
        if (uvIndex !== null) {
            fetchUVRecommendation();
        }
    }, [uvIndex]);

    // 查询涂抹时间
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
                .lte("uv_min", uvIndex)  // ✅ UV index 必须大于等于最小值
                .gte("uv_max", uvIndex)  // ✅ UV index 必须小于等于最大值
                .maybeSingle();  // 🔥 避免 "multiple rows" 错误

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