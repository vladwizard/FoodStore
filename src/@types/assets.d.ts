// declaration.d.ts
// declare module '*.scss';
// declare module '*.scss' {
//     const content: Record<string, string>;
//     export default content;
// }
declare module '*.css'{
    const content:any;
    export default content;
}
