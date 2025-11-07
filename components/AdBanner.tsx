import React, { useEffect } from 'react';

interface AdBannerProps {
    clientId: string;
    adSlotId: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ clientId, adSlotId }) => {
    useEffect(() => {
        if (clientId && adSlotId) {
            try {
                ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            } catch (e) {
                console.error("AdSense error:", e);
            }
        }
    }, [clientId, adSlotId]);

    if (!clientId || !adSlotId) {
        return (
            <div className="my-4 p-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg text-center">
                <p><strong>Ad Banner Placeholder</strong></p>
                <p className="text-sm">Please configure your AdSense Client & Slot ID in the Admin Panel.</p>
            </div>
        );
    }

    return (
        <div className="my-4 text-center">
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={clientId}
                data-ad-slot={adSlotId}
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
    );
};

export default AdBanner;
