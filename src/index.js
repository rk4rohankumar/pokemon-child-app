// Async boundary: lets webpack negotiate the shared singletons (react,
// react-dom, ...) before any module that imports them is evaluated.
import('./bootstrap');
