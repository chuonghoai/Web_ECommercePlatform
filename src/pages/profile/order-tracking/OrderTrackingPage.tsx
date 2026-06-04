const OrderTrackingPage = () => {
    return (
        <div className="bg-white border border-border-subtle rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-market-primary/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-market-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                </div>
                <div>
                    <h2 className="font-['Lora',serif] text-lg font-bold text-stone-900">
                        Theo dõi đơn hàng
                    </h2>
                    <p className="text-stone-400 text-xs mt-0.5">Kiểm tra trạng thái đơn hàng của bạn</p>
                </div>
            </div>

            <div className="p-10 flex flex-col items-center justify-center gap-5 text-center">
                <div className="relative">
                    <div className="w-28 h-28 rounded-full bg-market-primary/6 flex items-center justify-center">
                        <svg className="w-14 h-14 text-market-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-market-warning flex items-center justify-center shadow-sm">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>

                <div className="max-w-sm">
                    <p className="text-base font-semibold text-stone-800 mb-2">
                        Tính năng đang được phát triển
                    </p>
                    <p className="text-sm text-stone-500 leading-relaxed">
                        Chúng tôi đang xây dựng tính năng theo dõi đơn hàng. Bạn sẽ sớm có thể xem trạng thái, lịch sử và chi tiết từng đơn hàng tại đây.
                    </p>
                </div>

                <div className="w-full max-w-sm mt-2">
                    <div className="flex items-center justify-between gap-2">
                        {["Đặt hàng", "Xác nhận", "Vận chuyển", "Giao hàng"].map((step, index) => (
                            <div key={step} className="flex flex-col items-center gap-1.5 flex-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${index === 0
                                        ? "bg-market-primary text-white shadow-[0_2px_8px_rgba(194,65,12,0.3)]"
                                        : "bg-stone-100 text-stone-400"
                                    }`}>
                                    {index + 1}
                                </div>
                                <span className={`text-[10px] font-medium text-center leading-tight ${index === 0 ? "text-market-primary" : "text-stone-400"
                                    }`}>
                                    {step}
                                </span>
                                {index < 3 && (
                                    <div className="absolute" />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="relative -mt-6 mb-6 mx-4 flex items-center">
                        <div className="flex-1 h-px bg-stone-200">
                            <div className="h-px bg-market-primary/40 w-1/4" />
                        </div>
                    </div>
                </div>

                <p className="text-xs text-stone-400 mt-1">
                    Dự kiến ra mắt trong thời gian tới
                </p>
            </div>
        </div>
    );
};

export default OrderTrackingPage;
