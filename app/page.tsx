
"use client";
import { useMemo, useState } from "react";
import AutoMeter from "@/components/AutoMeter";
import { analyze } from "@/lib/strength";

export default function Page(){
  const [pw, setPw] = useState(""); 
  const result = useMemo(()=>analyze(pw), [pw]);

  return (
    <div className="page">
      <div className="card w-full max-w-4xl p-10 md:p-14">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Kiểm tra độ mạnh mật khẩu</h1>

        <div className="mt-8">
          <label className="block text-sm font-medium text-slate-700 mb-2">Mật khẩu</label>
          <input
            type="password"
            value={pw}
            onChange={(e)=>setPw(e.target.value)}
            placeholder="Nhập mật khẩu của bạn"
            className="input"
          />
          {pw && <AutoMeter score={result.score} label={result.label} />}
        </div>

        {pw && result.reasons.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-slate-800">Vì sao mật khẩu yếu / cần cải thiện?</h3>
            <ul className="list-disc list-inside text-sm text-slate-700 mt-2 space-y-1">
              {result.reasons.map((r,i)=>(<li key={i}>{r}</li>))}
            </ul>
          </div>
        )}

        <p className="text-xs text-slate-600 mt-8">Mẹo: dùng cụm từ dài, thêm chữ hoa, số và ký tự đặc biệt để tăng độ mạnh.</p>
      </div>
    </div>
  );
}
