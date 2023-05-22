
// takes in an array of objects with id property, returns array with duplicates removed
export const arrayFindUniqueEntries = (array: Array<{
    id: number,
    [key: string]: any
}>) : any[] => {

    const uniqueCharacters: any[] =  [...array.reduce((a:any,c:any)=>{
        a.set(c.id, c);
        return a;
    }, new Map()).values()];

    return uniqueCharacters;
};