export default class DateFormatter {
    static formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth()).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
}