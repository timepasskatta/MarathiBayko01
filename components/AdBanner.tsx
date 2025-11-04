import React, { useEffect } from 'react';

const AdBanner: React.FC = () => {
    useEffect(() => {
        try {
            // This is the global Adsense object.
            // The `|| []` is a safety measure.
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []);

    return (
        <div className="my-4 text-center">
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-YOUR_CLIENT_ID" // IMPORTANT: Replace with your client ID
                data-ad-slot="YOUR_AD_SLOT_ID"         // IMPORTANT: Replace with your ad slot ID
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
    );
};

export default AdBanner;