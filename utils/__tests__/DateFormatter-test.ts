import DateFormatter from "../DateFormatter";

test("Correctly formats date", () => {
    expect(DateFormatter.formatDate(new Date(2022, 2, 1))).toBe("2022-02-01");
});

export default {}