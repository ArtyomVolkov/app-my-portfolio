export const getLoremIpsum = async (paragraphs: number) => {
    try {
        const response = await fetch(`https://baconipsum.com/api/?type=meat-and-filler&paras=${paragraphs}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return [];
    }
}