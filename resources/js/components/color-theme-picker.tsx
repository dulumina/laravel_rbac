import { CheckOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { colorThemes, useColorTheme } from '@/hooks/use-color-theme';

export default function ColorThemePicker() {
    const { colorKey, updateColorTheme } = useColorTheme();

    return (
        <div className="flex flex-wrap gap-4">
            {colorThemes.map((theme) => (
                <Tooltip key={theme.key} title={theme.name}>
                    <button
                        type="button"
                        onClick={() => updateColorTheme(theme.key)}
                        className="flex flex-col items-center gap-1.5 cursor-pointer border-0 bg-transparent p-0 group"
                    >
                        <div
                            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:shadow-md"
                            style={{ backgroundColor: theme.color }}
                        >
                            {colorKey === theme.key && (
                                <CheckOutlined style={{ color: '#fff', fontSize: 16 }} />
                            )}
                        </div>
                        <span className="text-xs text-muted-foreground">{theme.name}</span>
                    </button>
                </Tooltip>
            ))}
        </div>
    );
}
