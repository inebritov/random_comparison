/*
 * NOTE :
 * 	This program is a JavaScript version of Mersenne Twister,
 * 	conversion from the original program (mt19937ar.c),
 * 	translated by yunos on december, 6, 2008.
 * 	If you have any questions about this program, please ask me by e-mail.
 *
 *
 *
 * Updated 2008/12/08
 * Ver. 1.00
 * charset = UTF8
 *
 * Mail : info@graviness.com
 * Home : http://www.graviness.com/
 *
 * ж“¬дјјд№±ж•°з”џж€ђе™ЁгѓЎгѓ«г‚»гѓігѓЊгѓ»гѓ„г‚¤г‚№г‚їг‚Їгѓ©г‚№пјЋ
 *
 * Mathг‚Їгѓ©г‚№гЃ®г‚Їгѓ©г‚№гѓЎг‚Ѕгѓѓгѓ‰гЃ«mersenneTwisterRandomгѓЎг‚Ѕгѓѓгѓ‰г‚’иїЅеЉ гЃ—гЃѕгЃ™пјЋ
 *
 * Ref.
 * 	http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/mt.html
 */



/**
 * ж“¬дјјд№±ж•°з”џж€ђе™ЁгѓЎгѓ«г‚»гѓігѓЊгѓ»гѓ„г‚¤г‚№г‚їг‚Їгѓ©г‚№пјЋ
 *
 * ж“¬дјјд№±ж•°з”џж€ђж–№жі•гЃ®жЁ™жє–гЃ§гЃ‚г‚‹гѓЎгѓ«г‚»гѓігѓЊгѓ»гѓ„г‚¤г‚№г‚їгЃЊе®џиЈ…гЃ•г‚ЊгЃѕгЃ™пјЋ
 *
 * з¬¦еЏ·з„ЎгЃ—32гѓ“гѓѓгѓ€ж•ґж•°ећ‹гЃ®дёЂж§д№±ж•°г‚’еџєжњ¬гЃЁгЃ—пјЊз¬¦еЏ·з„ЎгЃ—46гѓ“гѓѓгѓ€ж•ґж•°ећ‹дёЂж§д№±ж•°пјЊ
 * жµ®е‹•е°Џж•°з‚№ећ‹гЃ®дёЂж§д№±ж•°г‚’з”џж€ђгЃ—гЃѕгЃ™пјЋ
 * д№±ж•°з”џж€ђгЃ®е€ќжњџеЊ–гЃ«гЃЇпјЊдёЂгЃ¤гЃ®ж•ґж•°г‚’дЅїз”ЁгЃ—гЃѕгЃ™гЃЊпјЊеї…и¦ЃгЃ«еїњгЃгЃ¦
 * й…Ќе€—г‚’з”ЁгЃ„гЃџд»»ж„Џгѓ“гѓѓгѓ€е№…гЃ®еЂ¤г‚’дЅїз”ЁгЃ™г‚‹гЃ“гЃЁг‚‚гЃ§гЃЌгЃѕгЃ™пјЋ
 *
 * гЃ“гЃ®г‚Їгѓ©г‚№гЃЇд»Ґдё‹гЃ®г‚µг‚¤гѓ€(CиЁЂиЄћг‚Ѕгѓјг‚№)гЃ®JavaScriptиЁЂиЄћз§»ж¤Ќз‰€гЃ§гЃ™пјЋ
 * http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/MT2002/CODES/mt19937ar.c
 * (http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/mt.html)
 * е¤–йѓЁг‚¤гѓіг‚їгѓ•г‚§гѓјг‚№гЃЇпјЊJavaгЃ®java.util.Randomг‚Їгѓ©г‚№г‚’еЏ‚иЂѓгЃ«е®џиЈ…гЃ•г‚ЊгЃ¦гЃ„гЃѕгЃ™пјЋ
 * http://sdc.sun.co.jp/java/docs/j2se/1.4/ja/docs/ja/api/java/util/Random.html
 *
 * жЂ§иѓЅгЃЇпјЊгѓ“гѓ«гѓ€г‚¤гѓігЃ®Math.randomгЃ®зґ„2е€†гЃ®дёЂгЃ§гЃ™гЃЊпјЊ
 * д№±ж•°гЃ®е“ЃиіЄгЃЇеЅ“и©Іг‚µг‚¤гѓ€гЃ«з¤єгЃ™йЂљг‚ЉгЃ§гЃ™пјЋ
 *
 * дЅїз”Ёдѕ‹)
 * // г‚¤гѓіг‚№г‚їгѓіг‚№г‚’з”џж€ђгЃ—пјЊд№±ж•°з”џж€ђе™Ёг‚’зЏѕењЁж™‚е€»гЃ§е€ќжњџеЊ–гЃ—гЃѕгЃ™пјЋ
 * var mt = new MersenneTwister(new Date().getTime());
 * for (var i = 0; i < 1000; ++i) {
 * 	// 32гѓ“гѓѓгѓ€з¬¦еЏ·з„ЎгЃ—ж•ґж•°ећ‹гЃ®дёЂж§д№±ж•°
 * 	var randomNumber = mt.nextInteger();
 * }
 */
function class__MersenneTwister__(window)
{
	var className = "MersenneTwister";

	var $next = "$__next__";

	var N = 624;
	var M = 397;
	var MAG01 = [0x0, 0x9908b0df];

	/**
	 * ж–°гЃ—гЃ„д№±ж•°г‚ёг‚§гѓЌгѓ¬гѓјг‚їг‚’з”џж€ђгЃ—гЃѕгЃ™пјЋ
	 * еј•ж•°гЃ«еїњгЃгЃџг‚·гѓјгѓ‰г‚’иЁ­е®љгЃ—гЃѕгЃ™пјЋ
	 *
	 * @param (None)	ж–°гЃ—гЃ„д№±ж•°г‚ёг‚§гѓЌгѓ¬гѓјг‚їг‚’з”џж€ђгЃ—гЃѕгЃ™пјЋ
	 * г‚·гѓјгѓ‰гЃЇзЏѕењЁж™‚е€»г‚’дЅїз”ЁгЃ—гЃѕгЃ™пјЋ
	 * @see Date#getTime()
	 * ---
	 * @param number
	 * @see #setSeed(number)
	 * ---
	 * @param number[]
	 * @see #setSeed(number[])
	 * ---
	 * @param number, number, ...
	 * @see #setSeed(number, number, ...)
	 */
	var F = window[className] = function()
	{
		this.mt = new Array(N);
		this.mti = N + 1;

		var a = arguments;
		switch (a.length) {
		case 0:
			this.setSeed(new Date().getTime());
			break;
		case 1:
			this.setSeed(a[0]);
			break;
		default:
			var seeds = new Array();
			for (var i = 0; i < a.length; ++i) {
				seeds.push(a[i]);
			}
			this.setSeed(seeds);
			break;
		}
	};

	var FP = F.prototype;

	/**
	 * д№±ж•°г‚ёг‚§гѓЌгѓ¬гѓјг‚їгЃ®г‚·гѓјгѓ‰г‚’иЁ­е®љгЃ—гЃѕгЃ™пјЋ
	 *
	 * @param number	еЌдёЂгЃ®ж•°еЂ¤г‚’дЅїз”ЁгЃ—пјЊ
	 * 	д№±ж•°г‚ёг‚§гѓЌгѓ¬гѓјг‚їгЃ®г‚·гѓјгѓ‰г‚’иЁ­е®љгЃ—гЃѕгЃ™пјЋ
	 * ---
	 * @param number[]	и¤‡ж•°гЃ®ж•°еЂ¤г‚’дЅїз”ЁгЃ—пјЊ
	 * 	д№±ж•°г‚ёг‚§гѓЌгѓ¬гѓјг‚їгЃ®г‚·гѓјгѓ‰г‚’иЁ­е®љгЃ—гЃѕгЃ™пјЋ
	 * ---
	 * @param number, number, ...	и¤‡ж•°гЃ®ж•°еЂ¤г‚’дЅїз”ЁгЃ—пјЊ
	 * 	д№±ж•°г‚ёг‚§гѓЌгѓ¬гѓјг‚їгЃ®г‚·гѓјгѓ‰г‚’иЁ­е®љгЃ—гЃѕгЃ™пјЋ
	 */
	FP.setSeed = function()
	{
		var a = arguments;
		switch (a.length) {
		case 1:
			if (a[0].constructor === Number) {
				this.mt[0]= a[0];
				for (var i = 1; i < N; ++i) {
					var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
					this.mt[i] = ((1812433253 * ((s & 0xffff0000) >>> 16))
							<< 16)
						+ 1812433253 * (s & 0x0000ffff)
						+ i;
				}
				this.mti = N;
				return;
			}

			this.setSeed(19650218);

			var l = a[0].length;
			var i = 1;
			var j = 0;

			for (var k = N > l ? N : l; k != 0; --k) {
				var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30)
				this.mt[i] = (this.mt[i]
						^ (((1664525 * ((s & 0xffff0000) >>> 16)) << 16)
							+ 1664525 * (s & 0x0000ffff)))
					+ a[0][j]
					+ j;
				if (++i >= N) {
					this.mt[0] = this.mt[N - 1];
					i = 1;
				}
				if (++j >= l) {
					j = 0;
				}
			}

			for (var k = N - 1; k != 0; --k) {
				var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
				this.mt[i] = (this.mt[i]
						^ (((1566083941 * ((s & 0xffff0000) >>> 16)) << 16)
							+ 1566083941 * (s & 0x0000ffff)))
					- i;
				if (++i >= N) {
					this.mt[0] = this.mt[N-1];
					i = 1;
				}
			}

			this.mt[0] = 0x80000000;
			return;
		default:
			var seeds = new Array();
			for (var i = 0; i < a.length; ++i) {
				seeds.push(a[i]);
			}
			this.setSeed(seeds);
			return;
		}
	};

	/**
	 * ж¬ЎгЃ®ж“¬дјјд№±ж•°г‚’з”џж€ђгЃ—гЃѕгЃ™пјЋ
	 * @param bits	е‡єеЉ›еЂ¤гЃ®жњ‰еЉ№гѓ“гѓѓгѓ€ж•°г‚’жЊ‡е®љгЃ—гЃѕгЃ™пјЋ
	 * 	0 &lt; bits &lt;= 32гЃ§жЊ‡е®љгЃ—гЃѕгЃ™пјЋ
	 * @param ж¬ЎгЃ®ж“¬дјјд№±ж•°пјЋ
	 */
	FP[$next] = function(bits)
	{
		if (this.mti >= N) {
			var x = 0;

			for (var k = 0; k < N - M; ++k) {
				x = (this.mt[k] & 0x80000000) | (this.mt[k + 1] & 0x7fffffff);
				this.mt[k] = this.mt[k + M] ^ (x >>> 1) ^ MAG01[x & 0x1];
			}
			for (var k = N - M; k < N - 1; ++k) {
				x = (this.mt[k] & 0x80000000) | (this.mt[k + 1] & 0x7fffffff);
				this.mt[k] = this.mt[k + (M - N)] ^ (x >>> 1) ^ MAG01[x & 0x1];
			}
			x = (this.mt[N - 1] & 0x80000000) | (this.mt[0] & 0x7fffffff);
			this.mt[N - 1] = this.mt[M - 1] ^ (x >>> 1) ^ MAG01[x & 0x1];

			this.mti = 0;
		}

		var y = this.mt[this.mti++];
		y ^= y >>> 11;
		y ^= (y << 7) & 0x9d2c5680;
		y ^= (y << 15) & 0xefc60000;
		y ^= y >>> 18;
		return y >>> (32 - bits);
	};

	/**
	 * дёЂж§е€†еёѓгЃ®booleanећ‹гЃ®ж“¬дјјд№±ж•°г‚’иї”гЃ—гЃѕгЃ™пјЋ
	 * @return true or falseпјЋ
	 */
	FP.nextBoolean = function()
	{
		return this[$next](1) == 1;
	};

	/**
	 * дёЂж§е€†еёѓгЃ®з¬¦еЏ·з„Ў32гѓ“гѓѓгѓ€ж•ґж•°ећ‹гЃ®ж“¬дјјд№±ж•°г‚’иї”гЃ—гЃѕгЃ™пјЋ
	 * @return з¬¦еЏ·з„Ў32гѓ“гѓѓгѓ€ж•ґж•°ећ‹гЃ®ж“¬дјјд№±ж•°гЃ§пјЊ0д»ҐдёЉ4294967295д»Ґдё‹гЃ§гЃ™пјЋ
	 */
	FP.nextInteger = function()
	{
		return this[$next](32);
	};

	/**
	 * дёЂж§е€†еёѓгЃ®з¬¦еЏ·з„Ў46гѓ“гѓѓгѓ€ж•ґж•°ећ‹гЃ®ж“¬дјјд№±ж•°г‚’иї”гЃ—гЃѕгЃ™пјЋ
	 * @return з¬¦еЏ·з„Ў46гѓ“гѓѓгѓ€ж•ґж•°ећ‹гЃ®ж“¬дјјд№±ж•°гЃ§пјЊ0д»ҐдёЉ70368744177663д»Ґдё‹гЃ§гЃ™пјЋ
	 */
	FP.nextLong = function()
	{
		// NOTE: 48гѓ“гѓѓгѓ€д»ҐдёЉгЃ§иЁ€з®—зµђжћњгЃЊгЃЏгЃљг‚Њг‚‹пјЋ
		// (46 - 32) = 14 = [7] + [7], 32 - [7] = [25], 32 - [7] = [25]
		// 2^(46 - [25]) = 2^21 = [2097152]
		return this[$next](25) * 2097152 + this[$next](25);
	};

	/**
	 * 0.0пЅћ1.0гЃ®зЇ„е›ІгЃ§дёЂж§е€†еёѓгЃ®32гѓ“гѓѓгѓ€гѓ™гѓјг‚№гЃ®
	 * жµ®е‹•е°Џж•°з‚№ећ‹гЃ®ж“¬дјјд№±ж•°г‚’иї”гЃ—гЃѕгЃ™пјЋ
	 * @return еЌЉй–‹еЊєй–“гЃ®[0.0 1.0)гЃ§гЃ™пјЋ
	 */
	FP.nextFloat = function()
	{
		return this[$next](32) / 4294967296.0; // 2^32
	};

	/**
	 * 0.0пЅћ1.0гЃ®зЇ„е›ІгЃ§дёЂж§е€†еёѓгЃ®46гѓ“гѓѓгѓ€гѓ™гѓјг‚№гЃ®
	 * жµ®е‹•е°Џж•°з‚№ећ‹гЃ®ж“¬дјјд№±ж•°г‚’иї”гЃ—гЃѕгЃ™пјЋ
	 * @return еЌЉй–‹еЊєй–“гЃ®[0.0 1.0)гЃ§гЃ™пјЋ
	 */
	FP.nextDouble = function()
	{
		return (this[$next](25) * 2097152 + this[$next](25))
			/ 70368744177664.0; // 2^46
	};

} class__MersenneTwister__(window);



/**
 * ж“¬дјјд№±ж•°з”џж€ђгЃ«гѓЎгѓ«г‚»гѓігѓЊгѓ»гѓ„г‚¤г‚№г‚їг‚’дЅїз”ЁгЃ—пјЊеЌЉй–‹еЊєй–“[0 1.0)гЃ®
 * жµ®е‹•е°Џж•°з‚№ећ‹гЃ®ж“¬дјјд№±ж•°г‚’з”џж€ђгЃ—гЃѕгЃ™пјЋ
 * Math.randomгЃЁеђЊж§гЃ«дЅїз”ЁгЃ—гЃѕгЃ™пјЋ
 *
 * дЅїз”Ёдѕ‹)
 * // 0д»ҐдёЉ1г‚€г‚Ље°ЏгЃ•гЃ„дёЌе‹•е°Џж•°з‚№ећ‹гЃ®еЂ¤г‚’з”џж€ђгЃ—гЃѕгЃ™пјЋ
 * var r = Math.mersenneTwisterRandom();
 */
Math.mersenneTwisterRandom = function()
{
	Math.__MERSENNE_TWISTER__ = new MersenneTwister();

	return function() {
		return Math.__MERSENNE_TWISTER__.nextFloat();
	}
}();
