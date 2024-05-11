export const userDirectory = [
    {gln: '1111111111111', label: 'OAO "User"'},
    {gln: '2222222222222', label: 'ОAO "Usertest2"'},
    {gln: '4810268900006', label: 'OAO "Савушкин продукт"'},
    {gln: '4819003720008', label: 'ООО "Санта Ритейл"'},

    {gln: '2948845999999', label: '"Тестовый партнер для Савушкин Продукт"'},

]

export function findLabelByGln(gln: any){
    for (let i = 0; i < userDirectory.length; i++) {
        if(userDirectory[i].gln == new String(gln))
            return userDirectory[i].label
    }
    return '';
}