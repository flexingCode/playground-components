import { useRef, useEffect, useCallback } from "react";

interface InfinityListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    keyExtractor: (item: T) => string;
    endReachedThreshold: number;
    onEndReached: () => void;
    loader?: React.ReactNode;
    columns?: number;
    hasMore?: boolean;
}

const InfinityList = <T,>(props: InfinityListProps<T>) => {
    const { items, renderItem, keyExtractor, endReachedThreshold, onEndReached, loader, columns, hasMore = true } = props;

    const loaderRef = useRef<HTMLDivElement | null>(null);

    const intersectionHandler = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                onEndReached();
            }
        },
        [onEndReached]
    );

    useEffect(() => {
        const current = loaderRef.current;
        if (!current || !hasMore) return;

        const observer = new window.IntersectionObserver(intersectionHandler, {
            root: null,
            rootMargin: `0px 0px ${endReachedThreshold}px 0px`,
            threshold: 0.01,
        });

        observer.observe(current);

        return () => {
            observer.disconnect();
        };
    }, [intersectionHandler, endReachedThreshold, items.length, hasMore]);

    const gridColumns = columns || 1;

    return (
        <div 
            className="grid gap-4 w-full"
            style={{ gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))` }}
        >
            {items.map((item) => (
                <div key={keyExtractor(item)}>
                    {renderItem(item)}
                </div>
            ))}
            {items.length === 0 && (
                <div className="flex justify-center items-center h-full" style={{ gridColumn: `1 / -1` }}>
                    <p className="text-gray-500">No items found</p>
                </div>
            )}
            {hasMore && (
                <div ref={loaderRef} style={{ gridColumn: `1 / -1` }}>
                    {loader}
                </div>
            )}
        </div>
    );
};

export default InfinityList;