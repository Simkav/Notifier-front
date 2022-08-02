export type BaseAdapterProps = {
    className?: string;
    /**
     * Имя поля для формы
     */
    name: string;
    /**
     * Заголовок поля
     */
    label: string;
    /**
     * Имеет ли поле заголовок
     */
    hasLabel?: boolean;
};