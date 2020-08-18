import React from 'react';
import PromotionCard from '../Card/Card';
import './List.css';

const PromotionList = ({ loading, error, promotions}) => {
    if (error) {
        console.log(error);
        return <div>Algo de errado não está certo</div>;
    }

    if(loading || promotions === null) {
        return <div>Carregando...</div>;
    }
    
    if (promotions.length === 0) {
        return <div>Nenhum resultado encontrado</div>;
    }

    return (
        <div className="promotion-list">
            {promotions.map((promotion) => (
                <PromotionCard key={promotion.id} promotion={promotion}></PromotionCard>
            ))}
        </div>
    )
}

export default PromotionList;