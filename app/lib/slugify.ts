//slugify function
export function slugify(string: string) {
  const a = "àáäâãåąčćęèéëêìíïîłńòóöôõøśšùúüûůýÿžźżñç·/_,:;";
  const b = "aaaaaaaacceeeeeiiiilnoooooosuuuuuyyzzznc------";
  const p = new RegExp(a.split("").join("|"), "g");

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c: string) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}
