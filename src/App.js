import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import PokemonCard from "./components/PokemonCard";
import Loader from "./components/Loader";
import ErrorState from "./components/ErrorState";
import EmptyState from "./components/EmptyState";
import Pagination from "./components/Pagination";

const PAGE_SIZE = 20;
const API = "https://pokeapi.co/api/v2/pokemon";

const PokemonPage = () => {
  const [page, setPage] = useState(1);
  const [pokemon, setPokemon] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const pageCacheRef = useRef(new Map());

  const offset = (page - 1) * PAGE_SIZE;
  const totalPages = totalCount
    ? Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
    : 0;

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedQuery(searchInput.trim().toLowerCase());
    }, 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  const loadPage = useCallback(async (targetOffset) => {
    setError(null);
    if (pageCacheRef.current.has(targetOffset)) {
      const cached = pageCacheRef.current.get(targetOffset);
      setPokemon(cached.results);
      setTotalCount(cached.count);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const listRes = await axios.get(
        `${API}?limit=${PAGE_SIZE}&offset=${targetOffset}`
      );
      const details = await Promise.all(
        listRes.data.results.map((p) => axios.get(p.url).then((r) => r.data))
      );
      pageCacheRef.current.set(targetOffset, {
        results: details,
        count: listRes.data.count,
      });
      setPokemon(details);
      setTotalCount(listRes.data.count);
    } catch (e) {
      setError("Failed to load Pokémon. Please try again.");
      setPokemon([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const runSearch = useCallback(async (query) => {
    setError(null);
    setSearching(true);
    try {
      const res = await axios.get(`${API}/${query}`);
      setPokemon([res.data]);
      setTotalCount(0);
    } catch (e) {
      if (e?.response?.status === 404) {
        setPokemon([]);
        setError(null);
      } else {
        setError("Search failed. Please try again.");
        setPokemon([]);
      }
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      runSearch(debouncedQuery);
    } else {
      loadPage(offset);
    }
  }, [debouncedQuery, offset, loadPage, runSearch]);

  const handleRetry = () => {
    if (debouncedQuery) runSearch(debouncedQuery);
    else {
      pageCacheRef.current.delete(offset);
      loadPage(offset);
    }
  };

  const showPagination = !debouncedQuery && totalCount > 0;

  const content = useMemo(() => {
    if (loading && pokemon.length === 0) return <Loader fullScreen={false} />;
    if (error) return <ErrorState message={error} onRetry={handleRetry} />;
    if (pokemon.length === 0) return <EmptyState />;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pokemon.map((poke) => (
          <PokemonCard key={poke.id} poke={poke} />
        ))}
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error, pokemon]);

  return (
    <main className="max-w-6xl mx-auto p-4 motion-reduce:transform-none">
      <h1 className="text-3xl font-bold text-center mb-6">
        🔴 Pokémon List
      </h1>

      <form
        role="search"
        className="mb-6 flex justify-center items-center gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="pokemon-search" className="sr-only">
          Search Pokémon by name or id
        </label>
        <input
          id="pokemon-search"
          type="search"
          placeholder="Search Pokémon..."
          className="p-2 border border-gray-300 rounded-md w-64 text-center focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          aria-label="Search Pokémon"
        />
        {searching && <Loader fullScreen={false} label="Searching..." />}
      </form>

      <section aria-live="polite" aria-busy={loading || searching}>
        {content}
      </section>

      {showPagination && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() =>
            setPage((p) => (totalPages ? Math.min(totalPages, p + 1) : p + 1))
          }
        />
      )}
    </main>
  );
};

export default PokemonPage;
