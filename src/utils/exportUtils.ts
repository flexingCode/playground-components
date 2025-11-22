const exportCSV = (data: any[]) => {
    const csv = data.map(row => {
        return Object.values(row).join(',');
    }).join('\n');
    return csv;
}

const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
}

const downloadExportedCSV = (data: any[], filename: string) => {
    const csv = exportCSV(data);
    downloadCSV(csv, filename);
}

export { downloadExportedCSV };