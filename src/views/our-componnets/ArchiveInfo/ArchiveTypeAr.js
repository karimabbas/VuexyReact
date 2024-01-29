export const getTypeAr = (type) => {
    if (type === 'outArchive') {
        return 'أرشيف الصادر'
    } else if (type === 'inArchive') {
        return 'أرشيف الوارد'
    } else if (type === 'citArchive') {
        return 'أرشيف الزبائن'
    } else if (type === 'munArchive') {
        return 'أرشيف المؤسسة'
    } else if (type === 'financeArchive') {
        return 'أرشيف المالية'
    } else if (type === 'projArchive') {
        return 'أرشيف المشاريع'
    } else if (type === 'assetsArchive') {
        return 'أرشيف الاصول'
    } else if (type === 'empArchive') {
        return 'أرشيف الموظفين'
    } else if (type === 'contractArchive') {
        return 'أرشيف الاتفاقيات والعقود'
    } else if (type === 'lawArchieve') {
        return 'أرشيف القوانين والاجرائات'
    } else if (type === 'tradeArchive') {
        return 'أرشيف المعاملات'
    } else if (type === 'certArchive') {
        return 'شهادات / مراسات خارجية'
    } else if (type === 'taskArchive') {
        return 'أرشيف الطلبات'
    }
    return type
}