export default (lowest: any) => {
    const desolateLeatherPrice = lowest.desolateLeather * 500
    const heavyDesolateLeatherPrice = lowest.heavyDesolateLeather * 50;
    const profitableDesolateLeather = desolateLeatherPrice < heavyDesolateLeatherPrice ? desolateLeatherPrice : heavyDesolateLeatherPrice;

    const callousHidePrice = lowest.callousHide * 200;
    const heavyCallousHide = lowest.heavyCallousHide * 20;
    const profitableCallousHide = callousHidePrice < heavyCallousHide ? callousHidePrice : heavyCallousHide;

    const pallidBonePrice = lowest.pallidBone * 80;
    const enchantedHidePrice = lowest.enchantedHide * 20;
    const orborealShardPrice = lowest.orborealShard * 50;

    const boneshatterPrice = lowest.boneshatter;

    const productionPrice = profitableDesolateLeather + profitableCallousHide + pallidBonePrice + enchantedHidePrice + orborealShardPrice;
    // 5% is taken from sell price by AH
    const profitability = boneshatterPrice * 0.95 - productionPrice;
    return profitability;
}
