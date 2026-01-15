const NoRows = ({ colSpan, title }: { colSpan: number; title: string }) => {
    return (
        <tr>
            <td colSpan={colSpan} className="py-12 text-center text-slate-400">
                {title}
            </td>
        </tr>
    );
};

export default NoRows;
